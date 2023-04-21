import dbConnect from "@/lib/dbConnect";
import Thing from '../../../models/Thing';

export default async function handler(req, res) {
    const { method, body, query } = req;
    const { id } = query;

    await dbConnect();

    switch(method) {
        case 'GET':
            try {
                const thing = await Thing.findOne({ _id: id });
                if (!thing) {
                    return res.status(404).send('Not Found');
                }
                res.status(200).json(thing)
            } catch(err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            break;
        case 'PUT':
            try {
                const thing = await Thing.findByIdAndUpdate(id, body, { returnDocument: 'after' });
                if (!thing) {
                    return res.status(404).send('Not Found');
                }

                return res.status(200).json(thing)
            } catch(err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            break;
        case 'DELETE':
            try {
                const deletedCount = await Thing.findByIdAndDelete(id);
                if (!deletedCount) {
                    return res.status(404).send('Not Found');
                }

                return res.status(202).send('Delete Successful')
            } catch(err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            break;
        default:
            return res.status(400).send('Bad Request');
    }
}
