interface PageHeaderProps {
  imgLink: string;
  title: string;
  description?: string;
}

const PageHeader = ({ imgLink, title, description }: PageHeaderProps) => {
  return (
    <div>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src={imgLink}
          className="absolute inset-0 w-full h-full object-cover"
          alt={title}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl mx-auto text-lg text-slate-200">
              {description}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PageHeader;
