import { Customer } from "../customer_model/customer.model.js";

const registerCustomer = async (req, res) => {
  console.log("reached here: ", req.body);
  try {
    const response = await Customer.create(req.body);
    console.log("customer registered successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("error while registering customer: ", error);
  }
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  console.log("Email and password: ", email, password);

  try {
    const response = await Customer.findOne({ email });
    console.log("Response: ", response);

    if (response) {
      if (response.password == password) {
        console.log("customer login successfullly");
        res.status(200).json(response);
      } else {
        console.log("Entered wrong password");
        res.status(500).json({ message: "Entered wrong password" });
      }
    } else {
      res.status(500).json({ message: "email not found" });
      throw "email not found";
    }
  } catch (error) {
    console.log("error is: ", error);
  }
};

const updateCustomerDetails = async (req, res) => {
  console.log("req.body is:", req.body);
  const { task, customerId, data } = req.body;

  if (task == "bookmark") {
    try {
      const response = await Customer.updateOne(
        { _id: customerId },
        {
          $push: { bookmarkedRes: data },
        }
      );
      console.log("response: ", response);
      if (response.modifiedCount == 1) {
        res.status(200).json(response);
      } else {
        res.status(500).json({ message: "restaurant bookmarked failed" });
        throw "restaurant bookmarked failed";
      }
    } catch (error) {
      console.log("error is while restaurant bookmarked: ", error);
    }
  } else if (task == "removeBookmark") {
    try {
      const customer = await Customer.findOne({ _id: customerId });
      let customerBookmark = customer.bookmarkedRes;
      customerBookmark = customerBookmark.filter((e) => e != data);

      const response = await Customer.updateOne(
        { _id: customerId },
        {
          bookmarkedRes: customerBookmark,
        }
      );
      console.log("response: ", response);
      if (response.modifiedCount >= 1) {
        res.status(200).json(response);
      } else {
        res
          .status(500)
          .json({ message: "restaurant remove bookmarked failed" });
        throw "restaurant remove bookmarked failed";
      }
    } catch (error) {
      console.log("error is while restaurant remove bookmarked: ", error);
    }
  }
};

export { registerCustomer, loginCustomer, updateCustomerDetails };
