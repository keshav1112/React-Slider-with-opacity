import { useEffect, useRef, useState } from "react";
import ScreenreaderText from "~/components/atoms/ScreenreaderText/ScreenreaderText";
import { Arrow } from "~/components/icons/Arrow";
import { urlFor } from "~/services/sanity/urlFor";
import Spacer from "../Spacer/Spacer";
import Text from "../Text/Text";
import styles from "./Slider.module.css";

export interface SliderProps {
  slides: Array<{
    label?: string;
    title?: string;
    image?: string;
    slug?: string;
    description?: string;
    tag?: string;
    option?: boolean;
  }>;
  slugType?: "/case-studies/" | "/blog/";
  chipped?: boolean;
  grid?: boolean;
}

export default function Slider({
  slides,
  slugType,
  chipped = false,
  grid = false,
}: SliderProps) {
  const [count, setCount] = useState(0);

  const containerRef = useRef<HTMLElement>(null);

  const scrollView = (e: any) => {
    if (e.deltaX > 0) {
      setCount((count) => (count < slides.length - 1 ? count + 1 : count));
    } else if (e.deltaX < 0) {
      setCount((count) => (count > 0 ? count - 1 : count));
    }
  };

  useEffect(() => {
    if (count >= 0 && count < slides.length && containerRef?.current != null) {
      containerRef.current.scrollTo({
        behavior: "smooth",
        left:
          containerRef.current.children[count].getBoundingClientRect().left +
          containerRef.current.scrollLeft -
          containerRef.current.getBoundingClientRect().left,
      });
    }
  }, [count]);

  useEffect(() => {
    const throttleScrollView = debounce(scrollView, 100, false);
    containerRef.current?.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaX) {
          e.preventDefault();
          throttleScrollView(e);
        }
      },

      {
        passive: false,
      }
    );

    return () => {
      containerRef.current?.removeEventListener("wheel", throttleScrollView);
    };
  }, []);

  return (
    <div
      className={[styles.sliderWrapper, chipped ? styles.chipped : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          styles.relative,
          styles.marginRight,
          grid ? styles.gridWrapper : "",
        ].join(" ")}
      >
        <section
          className={[styles.sliderList, grid ? styles.gridLayout : ""].join(
            " "
          )}
          ref={containerRef}
        >
          {slides.map(
            (
              { label, title, image, slug, tag, description, option },
              index
            ) => (
              <article
                key={index}
                className={[
                  styles.gridArea,
                  styles["gridArea" + index],
                  grid,
                  grid === option ? styles.position : "",
                  index === count ? styles.active : "",
                ].join(" ")}
              >
                <a href={slugType && slugType + slug}>
                  {image && (
                    <img src={urlFor(image)} className={styles.sliderImage} />
                  )}

                  {!grid && (tag || title || description) && (
                    <div className={styles.slideInfo}>
                      {tag && (
                        <>
                          <Text size="tag" standout>
                            {tag}
                          </Text>
                        </>
                      )}
                      {title && (
                        <>
                          <Spacer size="base" />
                          <Text size="h3">{title}</Text>
                        </>
                      )}
                      {description && (
                        <>
                          <Spacer size="base" />
                          <Text size="body">{description}</Text>
                        </>
                      )}
                    </div>
                  )}

                  {grid && (label || tag || title || description) && (
                    <div className={styles.gridInfo}>
                      {label && (
                        <div className={styles.label}>
                          <Text size="tag">{label}</Text>
                        </div>
                      )}
                      {tag && (
                        <>
                          <Text size="tag" standout>
                            {tag}
                          </Text>
                        </>
                      )}
                      {title && (
                        <>
                          <Spacer size="base" />
                          <Text size="h3">{title}</Text>
                        </>
                      )}
                      {description && (
                        <>
                          <Spacer size="base" />
                          <Text size="body">{description}</Text>
                        </>
                      )}
                    </div>
                  )}
                </a>
              </article>
            )
          )}
        </section>
        <div
          className={[styles.actions, grid ? styles.actionGap : ""].join(" ")}
        >
          {count != 0 && (
            <button className={styles.prev} onClick={() => setCount(count - 1)}>
              <ScreenreaderText>Previous slide</ScreenreaderText>
              <Arrow />
            </button>
          )}
          {count != slides.length - 1 && (
            <button className={styles.next} onClick={() => setCount(count + 1)}>
              <ScreenreaderText>Next slide</ScreenreaderText>
              <Arrow />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function debounce(func: (e: any) => void, wait: number, immediate: boolean) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (e) {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
