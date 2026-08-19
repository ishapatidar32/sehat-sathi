import express from 'express';
import  {authenticate , requireRole} from '../middleware/auth.middleware.js';
import {createAvailability , getMyAvailability , getDoctorAvailability ,updateAvailability , deleteAvailability} from '../controllers/availability.controller.js';
const router = express.Router();
router.post('/', authenticate, requireRole('doctor'), createAvailability);
router.get('/Doctorme', authenticate, requireRole('doctor'), getMyAvailability);
router.get('/:doctorId', getDoctorAvailability); // public, for patients browsing
router.patch('/:id', authenticate, requireRole('doctor'), updateAvailability);
router.delete('/:id', authenticate, requireRole('doctor'), deleteAvailability);

export default router;