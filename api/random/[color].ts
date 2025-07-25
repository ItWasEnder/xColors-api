import { VercelRequest, VercelResponse } from '@vercel/node';
import ColorService from '../../src/services/color.service';

export default (req: VercelRequest, res: VercelResponse) => {
  try {
    const type = String(req.query.type) || 'all';
    const hue = req.query.color as string;
    const number = Number(req.query.number) || 1;
    const color = ColorService.getRandomShade(hue, type, number);
    return res.status(200).json(color);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal error');
  }
};