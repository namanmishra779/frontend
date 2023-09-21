// import React from "react";
// import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { validateString } from "../../utils/common";

// const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
//   const form = useForm({
//     initialValues: {
//       title: propertyDetails.title,
//       description: propertyDetails.description,
//       price: propertyDetails.price,
//     },
//     validate: {
//       title: (value) => validateString(value),
//       description: (value) => validateString(value),
//       price: (value) =>
//           value < 1000 ? "Must be greater than 999 dollars" : null,
//     },
//   });

//   const {title, description, price} = form.values


//   const handleSubmit = ()=> {
//     const {hasErrors} = form.validate()
//     if(!hasErrors) {
//      setPropertyDetails((prev)=> ({...prev, title, description, price}))
//      nextStep()
//     }
//    }
//   return (
//     <Box maw="50%" mx="auto" my="md">
//       <form  onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}>
//         <TextInput
//           withAsterisk
//           label="Title"
//           placeholder="Property Name"
//           {...form.getInputProps("title")}
//         />
//         <Textarea
//           placeholder="Description"
//           label="Description"
//           withAsterisk
//           {...form.getInputProps("description")}
//         />
//         <NumberInput
//           withAsterisk
//           label="Price"
//           placeholder="1000"
//           min={0}
//           {...form.getInputProps("price")}
//         />
//         <Group position="center" mt="xl">
//           <Button variant="default" onClick={prevStep}>
//             Back
//           </Button>
//           <Button type="submit">
//             Next step
//           </Button>
//         </Group>
//       </form>
//     </Box>
//   );
// };

// export default BasicDetails;

import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      propertyType: propertyDetails.propertyType, // Default value can be empty string or any other suitable default.
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Must be greater than 999 dollars" : null,
      propertyType: (value) =>
        !value ? "Please select a property type" : null,
    },
  });

  const { title, description, price, propertyType } = form.values;

  const handlePropertyTypeChange = (event) => {
    const selectedValue = event.currentTarget.value;
    form.setFieldValue("propertyType", selectedValue);
  };
  

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price, propertyType }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <br></br>
        <div>
  <label>Property Type:</label>
  <select   onChange={(e) => handlePropertyTypeChange(e)} withAsterisk>
    <option value="Family House">Family House</option>
    <option value="Apartment">Apartment</option>
    <option value="House & Villa">House & Villa</option>
    <option value="Office & Studio">Office & Studio</option>
    <option value="Villa & Condo">Villa & Condo</option>
  </select>
</div>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
