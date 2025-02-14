import { useState, useEffect } from 'react';
import axios from 'axios';

type Transactions = {
	id: number | null;
	dateTime: number;
	author: string;
	sum: number;
	category: string;
	comment: string;
};

const TransactionTracker: React.FC = () => {
	const [author, setAuthor] = useState<string>('');
	const [sum, setSum] = useState<number>(0);
	const [dateTime, setDateTime] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [comment, setComment] = useState<string>('');

	const [transaction, setTransaction] = useState<Transactions[]>([]);

	const categories = ['Развлечение', 'Машина', 'Дом', 'Другое'];

	// Добавление транзакций
	const handleAddExpense = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!author || !sum || !dateTime || !category || !comment) return;

		const newTransaction: Transactions = {
			id: null,
			dateTime: Date.now(),
			author,
			sum,
			category,
			comment,
		};

		try {
			const response = await axios.post(
				'http://localhost:3000/transactions',
				newTransaction
			);
			console.log('Транзакция успешно создана:', response.data);

			setTransaction([...transaction, response.data.jane]);
			setAuthor('');
			setSum(0);
			setCategory('');
			setComment('');
		} catch (error) {
			console.error('Ошибка при отправке транзакции:', error);
		}
	};

	// получаем данные и обнавляем список
	async function getTransactions() {
		try {
			const response = await axios.get('http://localhost:3000/transactions');
			const result = response.data.items;
			console.log(result);
			setTransaction(result);
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		getTransactions();
	}, []);

	const handleDeleteExpense = async (id: number) => {
		try {
			const response = await axios.delete(
				`http://localhost:3000/transactions/${id}`
			);

			if (response.status === 200) {
				setTransaction(
					transaction.filter(transaction => transaction.id !== id)
				);
				console.log('Транзакция успешно удалена');
			} else {
				console.error('Ошибка при удалении транзакции:', response.statusText);
			}
		} catch (error) {
			console.error('Ошибка при удалении транзакции:', error);
		}
	};

	return (
		<div className='p-6 max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Учет расходов</h1>

			<form onSubmit={handleAddExpense} className='mb-6'>
				<div className='mb-4'>
					<label className='block text-sm font-medium mb-1'>Автор:</label>
					<input
						type='text'
						value={author}
						onChange={e => setAuthor(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium mb-1'>Сумма:</label>
					<input
						type='number'
						value={sum || ''}
						onChange={e => setSum(parseFloat(e.target.value) || 0)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium mb-1'>Категория:</label>
					<select
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='w-full p-2 border rounded'
						required
					>
						<option value=''>Выберите категорию</option>
						{categories.map(cat => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium mb-1'>Комментарий:</label>
					<input
						type='text'
						value={comment}
						onChange={e => setComment(e.target.value)}
						className='w-full p-2 border rounded'
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium mb-1'>
						Дата и время:
					</label>
					<input
						type='datetime-local'
						value={dateTime}
						onChange={e => setDateTime(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
				>
					Добавить расход
				</button>
			</form>

			<div>
				<h2 className='text-xl font-bold mb-4'>Список расходов</h2>
				{transaction.length === 0 ? (
					<p className='text-gray-500'>Расходов пока нет.</p>
				) : (
					<ul>
						{transaction.map(transaction => (
							<li
								key={transaction.id}
								className='flex justify-between items-center p-2 border-b'
							>
								<span>
									{transaction.author} - {transaction.sum} тенге. (
									{transaction.category})
								</span>

								{transaction.id !== null ? (
									<button
										onClick={() => handleDeleteExpense(transaction.id)}
										className='text-red-500 hover:text-red-700'
									>
										Удалить
									</button>
								) : (
									''
								)}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default TransactionTracker;
