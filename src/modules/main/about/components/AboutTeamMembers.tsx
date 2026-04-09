import { teamMembersData } from "@/data/teamMembersData";

const AboutTeamMembers = () => {
  return (
    <section className="py-32 container mx-auto px-6 lg:px-20">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-serif">The Artisans.</h2>
        <p className="text-slate-400 hidden md:block max-w-50 text-xs font-bold uppercase tracking-widest leading-loose">
          The hands behind your most memorable moments.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {teamMembersData.map((member, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-6">
              <img
                src={member.image}
                className="w-full aspect-3/4 object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                alt={member.name}
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h4 className="text-xl font-bold">{member.name}</h4>
            <p className="text-slate-500 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutTeamMembers;
