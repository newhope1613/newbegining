import express from 'express';
import cors from 'cors';
import { Transaction } from './models.js';

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		meassge: 'Hello world',
	});
});

//Получаем данные при обнавлений
app.get('/transactions', async (req, res) => {
	try {
		const items = await Transaction.findAll();

		res.json({
			items,
		});
	} catch (error) {
		console.error('Ошибка при выполнений запроса ' + error);
		res.status(500).json({ message: 'Ошибка при получений данных' });
	}
});

//Создаем новую транзакцию
app.post('/transactions', async (req, res) => {
	console.log(req.body);
	let item = {
		datetime: Date.now(),
		author: req.body.author,
		sum: req.body.sum,
		category: req.body.category,
		comment: req.body.comment,
	};
	const jane = await Transaction.create(item);
	res.json({
		succses: 'true',
		jane,
	});
});

//Удаляем транзакцию
app.delete(`/transactions/:id`, async (req, res) => {
	const { id } = req.params;

	try {
		const result = await Transaction.destroy({
			where: { id },
		});

		if (result > 0) {
			res.status(200).json({ message: 'Транзакция успешно удалена' });
		} else {
			res.status(404).json({ message: 'Транзакция не найдена' });
		}
	} catch (error) {
		console.error('Ошибка при удалении транзакции:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

app.listen(PORT, () => {
	console.log('Server has been starting on ' + PORT);
});
