const AboutMissionVision = () => {
  return (
    <section className="py-32 container mx-auto px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="sticky top-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-primary mb-6">
            The Manifesto
          </h2>
          <p className="text-3xl md:text-4xl font-serif leading-snug">
            We don't just provide a room; we provide a{" "}
            <span className="italic">state of mind</span>. Our philosophy is
            rooted in the Japanese concept of Ma—the beauty of empty space.
          </p>
        </div>
        <div className="space-y-20">
          <div className="group">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary transition-all group-hover:w-16" />{" "}
              Our Mission
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              To curate hyper-personalized experiences that harmonize the
              guest's well-being with the local ecosystem. We prioritize
              intentional living and deep rest.
            </p>
          </div>
          <div className="group">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent transition-all group-hover:w-16" />{" "}
              Our Vision
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              To become the premier global benchmark for "Slow
              Hospitality"—where sustainability and absolute luxury are
              inseparable components of the journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVision;
