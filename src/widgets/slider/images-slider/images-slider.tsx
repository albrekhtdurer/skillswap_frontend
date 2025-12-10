// @ts-expect-error - Библиотека @splidejs/react-splide имеет несовместимую конфигурацию типов
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-expect-error - Библиотека @splidejs/react-splide имеет несовместимую конфигурацию типов
import type { Splide as SplideInstance } from "@splidejs/react-splide";
import { useState, useRef, useEffect } from "react";
import type { Options } from "@splidejs/splide";
import { IMAGES_OPTIONS } from "../constants/sliderOptions";

import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./images-slider.module.css";

type TImagesSliderProps = {
  images: string[];
  options?: Options;
};

export const ImagesSlider: React.FC<TImagesSliderProps> = ({
  images,
  options,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainRef = useRef<SplideInstance>(null);
  const thumbsCount = 3;

  useEffect(() => {
    if (images && mainRef.current?.splide) {
      mainRef.current.splide.go(0);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return <div className={styles.noImages}>Нет фотографий</div>;
  }

  const total = images.length;
  const visibleTotal = 1 + thumbsCount;
  const remaining = total > visibleTotal ? total - visibleTotal : 0;

  const finalOptions = {
    ...IMAGES_OPTIONS,
    ...options,
    arrows: (options?.arrows ?? IMAGES_OPTIONS.arrows ?? true) && total > 1,
  };

  const thumbIndices = Array.from(
    { length: thumbsCount },
    (_, i) => (currentIndex + 1 + i) % total,
  );

  return (
    <div className={styles.sliderWrapper}>
      <Splide
        className={styles.mainSlider}
        options={finalOptions}
        ref={mainRef}
        onMoved={(splide: SplideInstance) => setCurrentIndex(splide.index)}
      >
        {images.map((src, i) => (
          <SplideSlide key={i}>
            <img src={src} alt="" className={styles.mainImage} />
          </SplideSlide>
        ))}
      </Splide>

      {total > 1 && (
        <div className={styles.thumbsColumn}>
          {thumbIndices.map((idx, pos) => {
            const isFirst = pos === 0;
            const isLast = pos === thumbsCount - 1;
            const showPlus = isLast && remaining > 0;

            const thumbClasses = [
              styles.thumb,
              isFirst ? styles.firstThumb : "",
              isLast ? styles.lastThumb : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={idx}
                className={thumbClasses}
                onClick={() => mainRef.current?.go(idx)}
              >
                <img src={images[idx]} alt="" className={styles.thumbImg} />
                {showPlus && (
                  <div className={styles.plusOverlay}>+{remaining}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
