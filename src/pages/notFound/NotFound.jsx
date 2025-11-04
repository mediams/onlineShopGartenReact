// import React from "react";
// import styles from "./NotFound.module.scss"
// import ButtonLink from "../../components/ui/ButtonLink";

// const cactusImage = "/media/cactus.png";
// const fourImage = "/media/four.png";

// export default function NotFound() {
//   return <section><div className={styles.container404}>
//   <div className={styles.item}>
//     <img className={styles.image} src={fourImage} alt="404 page" />
//   </div>
//   <div className={styles.itemImg}>
//     <img className={styles.imagek} src={cactusImage} alt="404 page" />
//   </div>
//   <div className={styles.item}>
//     <img className={styles.image} src={fourImage} alt="404 page" />
//   </div>
// </div>
// <div className={styles.container}>
//       <h2 className={styles.title}>Page Not Found</h2>
//       <p className={styles.text}>
//         We’re sorry, the page you requested could not be found.
//       </p>
//       <p className={styles.text}>Please go back to the homepage.</p>
//       <div className={styles.buttonDiv}>
//         <ButtonLink text="Go home" to="/" />
//       </div>
//     </div>
// </section>;
// }

import React from "react";
import styles from "./NotFound.module.scss";
import ButtonLink from "../../components/ui/ButtonLink";
import Container from "../../components/container/Container"

const cactusImage = "/media/cactus.png";
const fourImage = "/media/four.png";

export default function NotFound() {
  return (
    <section className={styles.wrapper}>
      <Container>

      <div className={styles.block404}>
        <div className={styles.item}>
          <img className={styles.image} src={fourImage} alt="404 page" />
        </div>
        <div className={styles.itemImg}>
          <img className={styles.imagek} src={cactusImage} alt="404 page" />
        </div>
        <div className={styles.item}>
          <img className={styles.image} src={fourImage} alt="404 page" />
        </div>
      </div>
      <div className={styles.block}>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.text}>
          We’re sorry, the page you requested could not be found.</p>
        <p className={styles.text}>Please go back to the homepage.</p>
        <div className={styles.buttonDiv}>
          <ButtonLink text="Go home" to="/" />
        </div>
      </div>
      </Container>
      
    </section>
  );
}


