import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['Homeopathic', 'Allopathic', 'Ayurvedic', 'Supplements'],
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: false },
    date: { type: Date, default: Date.now },
});

// Prevent model overwrite in dev environments
const MedicineModel = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);
export default MedicineModel;
