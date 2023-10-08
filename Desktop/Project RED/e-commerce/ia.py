import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

data = pd.read_csv('interactions.csv')

user_product_matrix = pd.crosstab(data['user_id'], data['product_id'], values=data['interaction_type'], aggfunc='count').fillna(0)

user_similarity = cosine_similarity(user_product_matrix)

def get_user_recommendations(user_id, num_recommendations=2):
    if user_id not in user_product_matrix.index:
        return [] 

    user_index = user_product_matrix.index.get_loc(user_id)
    print("mon index : ", user_index)
    similar_users_indices = np.argsort(user_similarity[user_index])[::-1]
    print("mes similariter : ", similar_users_indices)
    similar_users_indices = similar_users_indices[1:]

    interacted_products = user_product_matrix.loc[user_id][user_product_matrix.loc[user_id] > 0].index

    recommendations = []
    for user_index in similar_users_indices:
        similar_user_id = user_product_matrix.index[user_index]
        similar_user_interactions = user_product_matrix.loc[similar_user_id]

        for product_id in similar_user_interactions.index:
            if product_id not in interacted_products and similar_user_interactions[product_id] > 0:
                recommendations.append(product_id)
                if len(recommendations) >= num_recommendations:
                    break
        if len(recommendations) >= num_recommendations:
            break

    return recommendations

user_id_to_recommend = 'gD3TyEbKSQPinQ1ZnlmyKsuRnIm1'
recommendations = get_user_recommendations(user_id_to_recommend, num_recommendations=2)

print(f"Produits recommandés pour l'utilisateur {user_id_to_recommend}: {recommendations}")