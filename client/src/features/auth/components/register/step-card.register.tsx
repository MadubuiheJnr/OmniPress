type StepCardProps = {
  step: number;
  title: string;
  active?: boolean;
};

export const StepCard = ({ step, title, active = false }: StepCardProps) => {
  return (
    <div
      className={`flex flex-col justify-center gap-3 rounded-xl p-4 transition-all duration-300
      ${
        active
          ? "bg-white text-black shadow-lg"
          : "bg-white/10 text-white/60 backdrop-blur-sm"
      }`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
        ${active ? "bg-black text-white" : "bg-white/20 text-white"}`}
      >
        {step}
      </div>

      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

export const GetStartedCard = () => {
  return (
    <div
      className="
          relative
          w-full
          h-screen
          flex
          items-end
          overflow-hidden
          rounded-md
          bg-gradient-to-br
          from-emerald-900
          via-green-950
          to-emerald-800
          p-6
          
        "
    >
      {/* Glow Effect */}
      <div
        className="
            absolute
            -right-16
            bottom-0
            h-48
            w-48
            rounded-full
            bg-emerald-300/30
            blur-3xl
          "
      />

      <div className="relative z-10">
        {/* Top Content */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-semibold leading-tight text-white">
            Get Started
            <br />
            with Us
          </h2>

          <p className=" text-sm leading-relaxed text-white/70">
            Complete these easy steps to register your account.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StepCard step={1} title="Sign up your account" active />

          <StepCard step={2} title="Set up your workspace" />

          <StepCard step={3} title="Set up your profile" />
        </div>
      </div>
    </div>
  );
};
