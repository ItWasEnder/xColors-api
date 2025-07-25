import { VercelRequest, VercelResponse } from '@vercel/node';
import ConverterService from '../src/services/converter.service';
import { requestValidation } from '../src/services/validation.service';

export default (req: VercelRequest, res: VercelResponse) => {
  try {
    const hex = requestValidation('hex', String(req.query.value));
    const rgb = ConverterService.convertHexToRgb(hex);
    return rgb 
      ? res.status(200).json({hex, rgb}) 
      : res.status(400).json({error: 'Incorrect request'});
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal error');
  }
};