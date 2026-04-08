const AboutLeft = () => {
  return (
    <div>
      {/* Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000"
          alt="Luxury Resort"
          className="rounded-2xl shadow-lg object-cover w-full h-[500px]"
        />

        {/* Floating badge */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow">
          <p className="text-sm font-medium">⭐ 4.9 Rating</p>
          <p className="text-xs text-muted-foreground">2,000+ happy guests</p>
        </div>
      </div>
    </div>
  );
};

export default AboutLeft;
