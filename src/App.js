import Map from "./components/map.js";
import Menu from "./components/databox.js";
import Legend from "./components/legendbox.js";
import anim from "./components/anim.js";

export default function App() {
  return (
    <div>
      
      <Menu />
      <Legend />
      <Map />
    </div>
  );
}
