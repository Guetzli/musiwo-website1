// Kursdaten, die auf mehreren Seiten vorkommen (Termin, Ort, Anmeldeschluss …).
// Liegen in content/, damit Laien sie via Pages CMS pflegen können.
import fs from "node:fs";

export default JSON.parse(fs.readFileSync("content/kurs.json", "utf8"));
