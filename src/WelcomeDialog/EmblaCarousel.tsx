// copied from https://codesandbox.io/p/sandbox/lym45v
import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import "./EmblaCarousel.css";

interface EmblaCarouselProps {
  slides: { [key: string]: React.ReactNode };
  options: { loop: boolean };
}

type EmblaApi = EmblaCarouselType | undefined;

export const EmblaCarousel = (props: EmblaCarouselProps) => {
  const { slides, options } = props;
  const plugins = [Autoplay()];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const onNavButtonClick = useCallback((emblaApi: EmblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) {
      return;
    }

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {Object.entries(slides).map(([key, value]) => (
            <div className="embla__slide" key={key}>
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index} // index is used as key in original code
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const useDotButton = (emblaApi: EmblaApi, onButtonClick: (emblaApi: EmblaApi) => void) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return;
      }
      emblaApi.scrollTo(index);
      if (onButtonClick) {
        onButtonClick(emblaApi);
      }
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaApi) => {
    if (!emblaApi) {
      return;
    }
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaApi) => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const DotButton = (props: { onClick: () => void; className: string }) => {
  const { ...restProps } = props;

  return <button type="button" {...restProps}></button>;
};
