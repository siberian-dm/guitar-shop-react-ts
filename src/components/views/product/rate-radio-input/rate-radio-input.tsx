import { forwardRef, LegacyRef } from 'react';

type TProps = {
  data: {
    id: string;
    name: string;
    value: number;
    title: string;
  };
  isLoading: boolean;
}

const RateRadioInput = forwardRef(
  ({ data, isLoading }: TProps, ref: LegacyRef<HTMLInputElement> | undefined) => (
    <>
      <input
        ref={ref}
        className="visually-hidden"
        type="radio"
        id={data.id}
        name={data.name}
        value={data.value}
        disabled={isLoading}
      />
      <label
        className="rate__label"
        htmlFor={data.id}
        title={data.title}
      />
    </>
  ),
);

RateRadioInput.displayName = 'RateRadioInput';

export default RateRadioInput;
