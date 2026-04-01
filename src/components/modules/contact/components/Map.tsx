const Map = () => {
  return (
    <div className="w-full h-100 md:h-125 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.27295180633!2d90.3758362!3d23.744945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a96b73f323106aa!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1716900000000!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="eManager IT Location"
      ></iframe>
    </div>
  );
};

export default Map;
