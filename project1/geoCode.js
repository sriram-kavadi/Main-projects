const fetch = require("node-fetch");

module.exports=async function geocode(address) {
  if (!address || !address.trim()) return null;
  const q = encodeURIComponent(address.trim());
  const key = process.env.OPENCAGE_KEY;
  if (!key) {
    console.error("OPENCAGE_KEY not set in .env");
    return null;
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${q}&key=${key}&limit=5&no_annotations=0`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error("Network error when calling OpenCage:", err);
    return null;
  }

  const text = await res.text();

  if (!res.ok) {
    console.error("OpenCage non-OK HTTP response:", res.status, text);
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch (err) {
    console.error("OpenCage returned non-JSON:", text);
    return null;
  }

  // OpenCage gives status.code (200) in payload.status
  if (!payload || !payload.status || payload.status.code !== 200) {
    console.error("OpenCage bad status:", payload && payload.status, text);
    return null;
  }

  const results = payload.results || [];
  if (!results.length) {
    // empty results array => no match
    console.warn("OpenCage: no results for address:", address);
    return null;
  }

  // Pick best result:
  // Prefer highest confidence (if provided) else first element.
  let best = results[0];
  for (const r of results) {
    // r.confidence may be undefined; treat higher number as better
    if (typeof r.confidence === "number" && typeof best.confidence === "number") {
      if (r.confidence > best.confidence) best = r;
    } else if (typeof r.confidence === "number" && typeof best.confidence !== "number") {
      best = r;
    }
  }

  // Ensure geometry exists
  if (!best.geometry || typeof best.geometry.lat !== "number" || typeof best.geometry.lng !== "number") {
    console.error("OpenCage: best result missing geometry:", best);
    return null;
  }

  // OPTIONAL: log the formatted address for debugging
  console.log("OpenCage chosen:", best.formatted, "confidence:", best.confidence);

  return {
    lat: best.geometry.lat,
    lng: best.geometry.lng
  };
}