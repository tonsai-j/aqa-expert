exports.joinexp = function (req, res) {
    r.db('aqa_meeting').table('group_expenses').merge(
        function (m) {
            var exp_sum = r.db('aqa_meeting').table('expenses').sum('expense_sum');
            var price_sum = r.db('aqa_meeting').table('expenses').getAll(m('id'), { index: 'group_expenses_id' }).sum('expense_sum');
            var amount_sum = r.db('aqa_meeting').table('expenses').getAll(m('id'), { index: 'group_expenses_id' }).count();
            var percentage = (price_sum.mul(100)).div(exp_sum);
            return {
                data: r.db('aqa_meeting').table('expenses').getAll(m('id'), { index: 'group_expenses_id' }).coerceTo('array'),
                price: price_sum,
                amount: amount_sum,
                percentage: percentage

            }
        }
    )
        .run()
        .then(function (data) {
            res.json(data)
        })
}