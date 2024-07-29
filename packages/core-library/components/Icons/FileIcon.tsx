interface Props {
  color?: string;
  height?: number;
  width?: number;
}

export const FileIcon: React.FC<Props> = ({
  color = "#000",
  width = 48,
  height = 48,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 32H18C17.4696 32 16.9609 32.2107 16.5858 32.5858C16.2107 32.9609 16 33.4696 16 34C16 34.5304 16.2107 35.0391 16.5858 35.4142C16.9609 35.7893 17.4696 36 18 36H30C30.5304 36 31.0391 35.7893 31.4142 35.4142C31.7893 35.0391 32 34.5304 32 34C32 33.4696 31.7893 32.9609 31.4142 32.5858C31.0391 32.2107 30.5304 32 30 32Z"
        fill={color}
      />
      <path
        d="M18 28H24C24.5304 28 25.0391 27.7893 25.4142 27.4142C25.7893 27.0391 26 26.5304 26 26C26 25.4696 25.7893 24.9609 25.4142 24.5858C25.0391 24.2107 24.5304 24 24 24H18C17.4696 24 16.9609 24.2107 16.5858 24.5858C16.2107 24.9609 16 25.4696 16 26C16 26.5304 16.2107 27.0391 16.5858 27.4142C16.9609 27.7893 17.4696 28 18 28V28Z"
        fill={color}
      />
      <path
        d="M39.48 16.66L28.6 4.65999C28.413 4.45281 28.1847 4.28705 27.9298 4.17338C27.6749 4.05972 27.3991 4.00065 27.12 3.99999H13.12C12.4555 3.99207 11.7959 4.11511 11.179 4.36211C10.5621 4.6091 9.99981 4.9752 9.52436 5.4395C9.04892 5.9038 8.66959 6.45721 8.40804 7.06813C8.14648 7.67904 8.00783 8.33549 8 8.99999V39C8.00783 39.6645 8.14648 40.3209 8.40804 40.9319C8.66959 41.5428 9.04892 42.0962 9.52436 42.5605C9.99981 43.0248 10.5621 43.3909 11.179 43.6379C11.7959 43.8849 12.4555 44.0079 13.12 44H34.88C35.5445 44.0079 36.2041 43.8849 36.821 43.6379C37.4379 43.3909 38.0002 43.0248 38.4756 42.5605C38.9511 42.0962 39.3304 41.5428 39.592 40.9319C39.8535 40.3209 39.9922 39.6645 40 39V18C39.9987 17.5043 39.8134 17.0268 39.48 16.66V16.66ZM28 9.99999L33.48 16H29.48C29.2706 15.9873 29.0657 15.9331 28.8775 15.8405C28.6892 15.7478 28.5213 15.6186 28.3835 15.4603C28.2458 15.3021 28.1409 15.118 28.075 14.9187C28.0092 14.7195 27.9837 14.5092 28 14.3V9.99999ZM34.88 40H13.12C12.9807 40.0081 12.8413 39.9886 12.7095 39.9427C12.5778 39.8968 12.4565 39.8254 12.3524 39.7325C12.2484 39.6396 12.1637 39.5271 12.1032 39.4014C12.0427 39.2757 12.0077 39.1393 12 39V8.99999C12.0077 8.86072 12.0427 8.72432 12.1032 8.59863C12.1637 8.47293 12.2484 8.36041 12.3524 8.26751C12.4565 8.17461 12.5778 8.10316 12.7095 8.05725C12.8413 8.01135 12.9807 7.99189 13.12 7.99999H24V14.3C23.9677 15.7732 24.5195 17.1994 25.5349 18.2673C26.5504 19.3352 27.947 19.9581 29.42 20H36V39C35.9923 39.1393 35.9573 39.2757 35.8968 39.4014C35.8363 39.5271 35.7516 39.6396 35.6476 39.7325C35.5435 39.8254 35.4222 39.8968 35.2905 39.9427C35.1587 39.9886 35.0193 40.0081 34.88 40Z"
        fill={color}
      />
    </svg>
  );
};
