const AboutHero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-20 overflow-hidden">
      <div className="z-10 mt-20">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Quiet <br />
          <span className="italic font-light text-slate-400">Luxury.</span>
        </h1>
      </div>

      {/* Asymmetric Hero Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-3/5 h-[60vh] lg:h-[80vh] z-0 opacity-80 lg:opacity-100">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover rounded-l-[5rem] lg:rounded-l-[10rem] shadow-2xl transition-transform duration-[10s] hover:scale-110"
          alt="Luxury Interior"
        />
      </div>
    </section>
  );
};

export default AboutHero;
