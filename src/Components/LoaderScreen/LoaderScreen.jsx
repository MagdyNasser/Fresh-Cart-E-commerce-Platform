import { FallingLines } from "react-loader-spinner";

export default function LoaderScreen() {
  return (
    <div className="h-screen flex justify-center items-center">
      <FallingLines
        color="#1F2937"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
}
