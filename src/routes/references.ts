import { Router } from 'express';
import { ReferenceController } from '..//features/reference/Reference.controller';

const router = Router();
const referenceController = new ReferenceController();

router.post('/', referenceController.create.bind(referenceController));
router.put('/', referenceController.update.bind(referenceController));
router.get('/:id', referenceController.findReference.bind(referenceController));
router.delete('/:id', referenceController.deleteReference.bind(referenceController));

export default router;
