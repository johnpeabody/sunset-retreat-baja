// Placeholder for real photography. Swap these for <Image> once the
// professional photos arrive — each just needs a src.
// Gradients use explicit sRGB stops (no oklab) for universal rendering.

const GRADIENTS: Record<string, string> = {
  ocean: "linear-gradient(135deg, #1f4e4f 0%, #2c6e6f 50%, #d8cab2 100%)",
  sunset: "linear-gradient(135deg, #b8714a 0%, #d8cab2 50%, #2c6e6f 100%)",
  sand: "linear-gradient(135deg, #e8dfd0 0%, #d8cab2 50%, #2c6e6f 100%)",
  deep: "linear-gradient(135deg, #2c6e6f 0%, #1f4e4f 55%, #2b2b28 100%)",
};

export default function Photo({
  label,
  variant = "ocean",
  className = "",
}: {
  label: string;
  variant?: keyof typeof GRADIENTS;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: GRADIENTS[variant] }}
    >
      <span className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  );
}
