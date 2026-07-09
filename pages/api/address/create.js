import main from "../../../database/conn";
import Address from "../../../models/userAddressSchema";

// Connect to database
const Create = async (req, res) => {
  await main().catch((err) => console.error(err));

  try {
    // Destructure request body
    const {
      user_id,
      address_line,
      city,
      postal_code,
      country,
      state,
      mobile,
      email,
      fullname,
    } = req.body;


    // Create new address object from request body
    const addressObj = {
      user_id,
      email,
      address_line,
      city,
      postal_code,
      country,
      state,
      mobile,
      fullname,
    };

    if (!state || state.trim() === "") {
      return res.status(400).json({
        error: "Please select a state",
      });
    }
    // Save new address to database
    const address = await Address(addressObj).save();
    res.status(201).json({ shipping_address: address._id });
  } catch (error) {
    console.log("the error is : ", error);
    res.status(500).json({ error });
  }
};

export default Create;
