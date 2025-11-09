interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "purple" | "blue" | "green" | "red" | "white" | "gray";
  className?: string;
  text?: string; 
  textPosition?: "top" | "bottom" | "left" | "right";
  center?: boolean;
}

export const Spinner = ({
  size = "md",
  color = "purple",
  className = "",
  text, 
  textPosition = "bottom",
  center = true,
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const colorClasses = {
    purple: {
      spinner: "border-b-2 border-purple-800",
      text: "text-purple-800"
    },
    blue: {
      spinner: "border-b-2 border-blue-500",
      text: "text-blue-500"
    },
    green: {
      spinner: "border-b-2 border-green-500",
      text: "text-green-500"
    },
    red: {
      spinner: "border-b-2 border-red-500", 
      text: "text-red-500"
    },
    white: {
      spinner: "border-b-2 border-white",
      text: "text-white"
    },
    gray: {
      spinner: "border-b-2 border-gray-500",
      text: "text-gray-500"
    },
  };

  const textPositions = {
    top: "flex-col-reverse",
    bottom: "flex-col",
    left: "flex-row-reverse",
    right: "flex-row",
  };

  const spinner = (
    <div
      className={`animate-spin  rounded-full ${text && 'my-8'} ${colorClasses[color].spinner} ${sizeClasses[size]} ${className}`}
    ></div>
  );


  if (!text) {
    return center ? (
      <div className="flex  justify-center items-center">{spinner}</div>
    ) : (
      spinner
    );
  }

  const containerClasses = `
    flex items-center gap-3
    ${textPositions[textPosition]}
    ${center ? "justify-center" : ""}
  `;

  return (
    <div className={containerClasses}>
      {spinner}
      <span className={colorClasses[color].text}>{text}</span>
    </div>
  );
};