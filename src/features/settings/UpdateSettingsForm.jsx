import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingsLength,
      maxBookingsLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isLoading) return <Spinner />;

  const handleUpdate = (e, field) => {
    const { value } = e.target;
    if (value) updateSetting({ [field]: value });
    e.preventDefault();
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingsLength}
          onBlur={(e) => handleUpdate(e, "minBookingsLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingsLength}
          onBlur={(e) => handleUpdate(e, "maxBookingsLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
