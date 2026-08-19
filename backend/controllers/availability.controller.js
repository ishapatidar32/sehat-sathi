import {DoctorAvailability} from "../model/DoctorAvailability.js";
import {User} from "../model/user.js"
export async function  createAvailability(req , res) {
   try{
    const {startTime , endTime ,  slotDurationMinutes , dayOfWeek  } = req.body;
    const doctorId = req.User.id;
    if(dayOfWeek === undefined || !startTime || !endTime){
        return res.status(400).json({message : 'dayOfWeek  , startTime , endTime are required'});
    }
    if (startTime >= endTime) {
      return res.status(400).json({ message: 'startTime must be before endTime' });
    }
    // prevent overlapping blocks for the smae day 
    const overlapping = await DoctorAvailability.findOne({
      doctorId,
      dayOfWeek,
      isActive: true,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });
    if (overlapping) {
      return res.status(409).json({ message: 'This overlaps an existing availability block' });
    }
    const availability = await DoctorAvailability.create({
      doctorId, dayOfWeek, startTime, endTime,
      slotDurationMinutes: slotDurationMinutes || 30
    });
    res.status(201).json(availability);
   }catch(err){
    res.status(500).json({message : 'server error' , error : err.message});
   }
};
export async function  getMyAvailability  (req, res)  {
  try {
    const availability = await DoctorAvailability.find({
      doctorId: req.user.id,
      isActive: true
    }).sort({ dayOfWeek: 1, startTime: 1 });

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export async function getDoctorAvailability  (req, res)  {
  try {
    const { doctorId } = req.params;
    const availability = await DoctorAvailability.find({
      doctorId,
      isActive: true
    }).sort({ dayOfWeek: 1, startTime: 1 });

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export async function updateAvailability (req, res)  {
  try {
    const { id } = req.params;
    const availability = await DoctorAvailability.findById(id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability block not found' });
    }
    if (availability.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this block' });
    }

    const { startTime, endTime, slotDurationMinutes, isActive } = req.body;
    if (startTime) availability.startTime = startTime;
    if (endTime) availability.endTime = endTime;
    if (slotDurationMinutes) availability.slotDurationMinutes = slotDurationMinutes;
    if (isActive !== undefined) availability.isActive = isActive;

    if (availability.startTime >= availability.endTime) {
      return res.status(400).json({ message: 'startTime must be before endTime' });
    }

    await availability.save();
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export async function deleteAvailability  (req, res)  {
  try {
    const { id } = req.params;
    const availability = await DoctorAvailability.findById(id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability block not found' });
    }
    if (availability.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this block' });
    }

    await availability.deleteOne();
    res.json({ message: 'Availability block deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};