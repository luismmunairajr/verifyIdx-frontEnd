import { useEffect, useState } from "react";
import axios from "axios";

export function useGeoIP(ip) {
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    if (!ip) return;

    axios
      .get(`https://ipapi.co/${ip}/json/`)
      .then((res) => setGeo(res.data))
      .catch((err) => console.error("GeoIP error:", err));
  }, [ip]);

  return geo;
}
