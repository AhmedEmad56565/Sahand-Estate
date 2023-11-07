import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${id}`);
      const data = await res.json();

      if (data.status === false) {
        setLoading(false);
        return;
      }

      setLoading(false);
      setListing(data);
    };
    fetchListing();
  }, [id]);

  return (
    <main>
      {loading && (
        <p className='text-2xl text-center font-semibold mt-7'>Loading...</p>
      )}

      {listing && !loading && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[500px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
