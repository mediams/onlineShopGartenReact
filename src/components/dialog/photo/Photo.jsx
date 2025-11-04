import React from 'react';
import styles from './Photo.module.scss';

export default function Photo({ dialogContent }) {
  return <dialog open>{dialogContent}</dialog>;
}
