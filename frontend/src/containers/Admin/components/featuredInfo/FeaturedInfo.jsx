import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Teachers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">54</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Students</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">432</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Subjects</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">43</span>
        </div>
      </div>
    </div>
  );
}
