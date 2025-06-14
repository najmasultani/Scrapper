
const Hero = () => {
  // Scrolls to "how-it-works" when CTA clicked
  const scrollToExplainer = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-16 md:py-20 px-4 md:px-10 max-w-6xl mx-auto">
      {/* Left: text/cta */}
      <div className="md:max-w-lg w-full flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4 animate-fade-in">
          Turn Local Food Waste<br /><span className="text-green-600">Into Garden Gold</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in delay-75">
          Connect restaurants and gardeners across Canada.<br />Save food waste. Grow stronger communities.
        </p>
        <button
          onClick={scrollToExplainer}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8 py-4 font-bold shadow-lg transition-all text-lg animate-fade-in delay-100 hover-scale"
        >
          Learn How It Works
        </button>
      </div>
      {/* Right: illustration/animation */}
      <div className="w-full flex justify-center md:justify-end">
        {/* Placeholder: illustration of food scraps to soil */}
        <div className="relative w-[320px] md:w-[400px] aspect-[1.1/1] animate-fade-in">
          <svg viewBox="0 0 400 360" fill="none" className="w-full h-full">
            {/* Soil */}
            <ellipse cx="200" cy="320" rx="170" ry="40" fill="#775329"/>
            {/* Sprout */}
            <g>
              <ellipse cx="200" cy="250" rx="16" ry="36" fill="#CAFFDB"/>
              <path d="M200 250C200 218 240 230 225 261C220 266 210 260 200 250Z" fill="#60C67B"/>
              <path d="M200 250C200 218 160 230 175 261C180 266 190 260 200 250Z" fill="#81EA97"/>
              <rect x="192" y="231" width="16" height="62" rx="8" fill="#5D9B5D"/>
            </g>
            {/* Food scraps (banana, coffee, etc) in cartoon style */}
            <g>
              {/* Banana */}
              <path d="M140 170 Q120 200 150 210 Q155 205 143 180 Z" fill="#F9E588"/>
              {/* Apple core */}
              <ellipse cx="180" cy="175" rx="11" ry="16" fill="#F5BBAA"/>
              <ellipse cx="180" cy="175" rx="4" ry="10" fill="#fff"/>
              {/* Coffee grounds */}
              <ellipse cx="235" cy="205" rx="14" ry="6" fill="#4B3228"/>
              {/* Eggshell */}
              <ellipse cx="265" cy="185" rx="14" ry="8" fill="#F9F6EE"/>
              <path d="M265 183 Q270 178 274 185 Q273 186 265 185Z" fill="#E4E1DA"/>
            </g>
            {/* Animated arrow from scraps to soil (decorative) */}
            <path d="M190 220 Q200 285 200 319"
              stroke="#60C67B" strokeWidth="6" strokeDasharray="10 10" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
                <polygon points="0 0, 12 6, 0 12" fill="#60C67B"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
