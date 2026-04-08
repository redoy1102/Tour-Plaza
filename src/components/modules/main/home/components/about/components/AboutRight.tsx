// import PrimaryButton from "@/components/shared/buttons/PrimaryButton";


const AboutRight = () => {
  return (
    <div>
      {/* Content */}
      <div>
        <p className="text-sm uppercase tracking-widest text-primary mb-3">
          About Tour Plaza
        </p>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Experience Nature in Its Most
          <span className="text-primary"> Luxurious Form</span>
        </h2>

        <p className="text-muted-foreground mb-6">
          Nestled in breathtaking landscapes, Tour Plaza offers a perfect blend
          of tranquility and elegance. From private villas to world-class
          amenities, every detail is crafted to give you an unforgettable stay.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h4 className="font-semibold">🌿 Eco-Friendly</h4>
            <p className="text-sm text-muted-foreground">
              Sustainable luxury living
            </p>
          </div>

          <div>
            <h4 className="font-semibold">🏝 Private Villas</h4>
            <p className="text-sm text-muted-foreground">
              Ultimate privacy & comfort
            </p>
          </div>

          <div>
            <h4 className="font-semibold">🍽 Fine Dining</h4>
            <p className="text-sm text-muted-foreground">World-class cuisine</p>
          </div>

          <div>
            <h4 className="font-semibold">💆 Spa & Wellness</h4>
            <p className="text-sm text-muted-foreground">Relax & rejuvenate</p>
          </div>
        </div>
        {/* CTA */}
        {/* <div className="pt-6">
          <PrimaryButton title="Learn Our Story" hoverType px="8" py="6" />
        </div> */}
      </div>
    </div>
  );
};

export default AboutRight;
