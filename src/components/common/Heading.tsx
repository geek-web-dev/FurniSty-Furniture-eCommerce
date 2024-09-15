const Heading = ({ title, location }: { title: string; location?: string }) => {
  return (
    <div className="mb-8">
      <p className="opacity-50 mb-1">
        {location}
        <span className="font-semibold"></span>
      </p>
      <h1 className="text-4xl font-semibold opacity-50 capitalize">{title}</h1>
    </div>
  );
};

export default Heading;
