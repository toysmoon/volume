import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useState, TouchEvent } from 'react';
import useHeight from 'utils/hooks/useHeight';

type VolumeInfo = {
  volume: number;
  isMuted: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const res = await fetch(`http://${host}/api/volume`);
  const volumeInfo: VolumeInfo = await res.json();

  return {
    props: {
      host,
      volumeInfo,
    },
  };
};

function Home({
  host,
  volumeInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const height = useHeight();
  const [volume, setVolume] = useState(volumeInfo.volume);
  const [position, setPosition] = useState(0);

  const updateVolume = () => fetch(`http://${host}/api/volume/${volume}`);

  const handleStart = (e: TouchEvent<HTMLInputElement>) =>
    setPosition(e.targetTouches[0].clientY);

  const handleMove = (e: TouchEvent<HTMLInputElement>) => {
    setPosition(e.targetTouches[0].clientY);
    const currentPositon = e.targetTouches[0].clientY;
    if (currentPositon < position) {
      volume < 100 && setVolume(volume + 1);
    } else {
      volume > 0 && setVolume(volume - 1);
    }
  };

  return (
    <div
      className="container"
      onTouchMove={handleMove}
      onTouchStart={handleStart}
      onTouchEnd={updateVolume}
    >
      <h1 className="volume">{volume}</h1>
      <div className="current-volume-bar">
        <h1 className="volume volume-bar">{volume}</h1>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: White;
        }
        .volume {
          margin: 0;
          color: Black;
          font-size: 5rem;
        }
        .current-volume-bar {
          position: absolute;
          top: ${100 - volume}%;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: Black;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          overflow: hidden;
        }
        .volume-bar {
          color: White;
          margin-bottom: ${height ? `${height / 2}px` : '50vh'};
          transform: translateY(50%);
        }
      `}</style>
    </div>
  );
}

export default Home;
