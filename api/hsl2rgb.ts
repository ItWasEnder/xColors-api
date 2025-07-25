import { VercelRequest, VercelResponse } from '@vercel/node';
import ConverterService from '../src/services/converter.service';
import { requestValidation } from '../src/services/validation.service';

export default (req: VercelRequest, res: VercelResponse) => {
  try {
    const hsl = requestValidation('hsl', String(req.query.value));
    const rgb = ConverterService.convertHslToRgb(hsl);
    return rgb 
      ? res.status(200).json({hsl, rgb}) 
      : res.status(400).json({error: 'Incorrect request'});
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal error');
  }
};