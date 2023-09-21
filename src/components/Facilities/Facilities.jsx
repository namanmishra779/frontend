// import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useContext } from "react";
import { getEmail, getUser } from "../data/TokenData";
// import UserDetailContext from "../../context/UserDetailContext";
// import useProperties from "../../hooks/useProperties.jsx";
// import { useMutation } from "react-query";
import { toast } from "react-toastify";
// import { createResidency } from "../../utils/api";
const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      areacode: propertyDetails.facilities.areacode,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });

  const { bedrooms, areacode, bathrooms } = form.values;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, areacode, bathrooms },
      }));
      // mutate();
    }

    formData.append("bathrooms", propertyDetails.facilities.bathrooms);
    formData.append("bedrooms", propertyDetails.facilities.bedrooms);
    formData.append("areaCode", propertyDetails.facilities.areacode);
    formData.append("imageFile", propertyDetails.image);
    formData.append("title", propertyDetails.title);
    formData.append("description", propertyDetails.description);
    formData.append("country", propertyDetails.country);
    formData.append("price", propertyDetails.price);
    formData.append("address", propertyDetails.address);
    formData.append("propertyType", propertyDetails.propertyType);
    formData.append("city", propertyDetails.city);
    formData.append("email", getEmail());

    axios
      .post("/api/properties/addProperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  console.log(propertyDetails);

  // ==================== upload logic
  // const { user } = useAuth0();
  // const {
  //   userDetails: { token },
  // } = useContext(UserDetailContext);
  // const { refetch: refetchProperties } = useProperties();

  // const {mutate, isLoading} = useMutation({
  //   mutationFn: ()=> createResidency({
  //       ...propertyDetails, facilities: {bedrooms, areacode , bathrooms},
  //   }, token),
  //   onError: ({ response }) => toast.error(response.data.message, {position: "bottom-right"}),
  //   onSettled: ()=> {
  //     toast.success("Added Successfully", {position: "bottom-right"});
  //     setPropertyDetails({
  //       title: "",
  //       description: "",
  //       price: 0,
  //       country: "",
  //       city: "",
  //       address: "",
  //       image: null,
  //       facilities: {
  //         bedrooms: 0,
  //         areacode: 0,
  //         bathrooms: 0,
  //       },
  //       userEmail: user?.email,
  //     })
  //     setOpened(false)
  //     setActiveStep(0)
  //     refetchProperties()
  //   }

  // })

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label=" areacode"
          min={0}
          {...form.getInputProps("areacode")}
        />
        <NumberInput
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" onClick={(e) => handleSubmit(e)}>
            Submit
            {/* {isLoading ? "Submitting" : "Add Property"} */}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
