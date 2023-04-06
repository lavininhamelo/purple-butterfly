# Purple Butterfly
Purple Butterfly is a descentralized content social network to connect users content creators and developers, it is only a study case of a real good microservice and also a great example of working with Blockchain.

Business Rules
In the system, there are two main focuses: content creation and interaction with content.

Focusing on the decentralized part, let's go to the TOKEN rules.

Definitions:
User - Account based on the logged-in and signed Wallet.
Post - A content created by the user, and has a cost when created.
SubPost - A post created by the user that has a Post as a parent.
Questions - A paid request for an answer that may or may not be accepted by the Post owner. (OUT)
Like - A positive evaluation paid to the creator, which increases the relevance of a Post.
Dislike - A negative evaluation that decreases the reputation of the Post only.
Relevance - It is the classification point of the Post, and uses the amount of Likes and Dislikes to be classified.

Content

Each Post costs 1 token, however, the first Post is free.
A Post can have several SubPosts and several Questions.
Posts also have Likes, for each Like the Post gains 1 point of relevance.
Posts have Dislikes, for every 2 Dislikes the Post loses 1 point of relevance.
A Like on a Post has a value of 1 token, this token is transferred to the Post owner.
SubPost also costs 1 token, this token is transferred to the Post owner's account.
The cost of a Question is 2 tokens, but only one is transferred to the Post owner, and the second one is on hold.
If the owner refuses a Question, the second token is returned.
If the owner accepts a Question, he can answer it without any cost.
When answering a Question, the owner receives the second token.
If the owner takes more than 7 days, the token returns to the author of the question.
User

The user can change photo, name, and bio.
The user should be able to list Posts by relevance or by date.
The user does not need to be in the system to access the data.
The user should be able to filter Posts by Tags.
The user should be able to search for a Post.
Admin

Mint tokens.
Penalize posts.
Block wallets.
Change contract values.
Burn tokens.
View Tags.
View activities per user.
View activities per Post.

