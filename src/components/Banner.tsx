import Contact from "@/components/Contact";

import styles from "@/components/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.lead}>
          <p>
            <span>Sa Talaia</span> is a post-agency
          </p>
          working with scientists, creatives, technologists and thinkers to
          build a path to a smarter, more resilient, just and sustainable
          future.
        </div>
        <div className={styles.experience}>
          <p>Previously worked with:</p>
          <p>
            R&D at The New York Times, YCombinator, Forensic Architecture and
            many others.
          </p>

          <p>Exhibited and featured at:</p>
          <p>The Kennedy Center, NPR, The Guardian, BBC, etc</p>
        </div>
        <Contact />
      </div>
    </div>
  );
};

export default Banner;
