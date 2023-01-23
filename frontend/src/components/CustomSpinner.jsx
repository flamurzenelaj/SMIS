import ClipLoader from "react-spinners/ClipLoader";

const CustomSpinner = ({ size = 50 }) => {
  const color = "#C69A50";

  return <ClipLoader color={color} size={size} />;
};

export default CustomSpinner;
