import dbConnect from "@/lib/dbConnect";
import Thing from '../../../models/Thing';

export default async function handler(req, res) {
    const { method, body } = req;

    await dbConnect();

    switch(method) {
        case 'GET':
            try {
                const things = await Thing.find({});
                res.status(200).json(things)
            } catch(err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
            break;
        case 'POST':
            try {
                const thing = await Thing.create(body);
                res.status(200).json(thing)
            } catch(err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
            break;
        default:
            res.status(400).send('Bad Request');
    }
}
