import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    //Business Employee ID
    //this block will help to restrict the change of employee id after it is created
    employeeId: {
      type: Number,
      required: function () {
        return this.isNew; // required ONLY on CREATE
      },
      unique: true,
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    dob: { type: Date },
    phone: { type: String },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  }
);

export default mongoose.model("Employee", employeeSchema);
