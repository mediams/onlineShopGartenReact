export default function Icon({ id, w, h }) {
  return (
    <div>
      <svg width={w} height={h}>
        <use href={`media/icons.svg#${id}`} />
      </svg>
    </div>
  );
}
