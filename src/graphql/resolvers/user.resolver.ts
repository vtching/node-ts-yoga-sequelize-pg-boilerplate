import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { Resolvers } from '../generated/graphql';
import AppConfig from '../../config';
import { createGraphQLError } from 'graphql-yoga';
import { ValidationError } from 'sequelize';

const resolvers: Resolvers = {
  Query: {
    user: (_, { id }) => {
      return User.findByPk(parseInt(id));
    }
  },
  Mutation: {
    register: async (_, { input }) => {
      const email = input?.email;
      const password = input?.password;
      if (!email || !password) {
        return Promise.reject(createGraphQLError('Invalid input'));
      }
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return Promise.reject(createGraphQLError('User already exists'));
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const result = await User.create({ email, password: hashedPassword });
        await result.save();
        // Generate JWT token
        const token = jwt.sign({ id: result.id }, AppConfig.jwtSecret, { expiresIn: '1h' });

        return {
          user: result,
          token,
        };
      } catch (e) {
        console.error(e);
        let message = 'Cannot create user';
        if (e instanceof ValidationError) {
          switch (e.errors.at(0)?.validatorKey) {
            case 'isEmail':
              message = 'Please enter a valid email';
              break;
          }
        }
        return Promise.reject(createGraphQLError(message));
      }
    },
    login: async (_, { input }) => {
      const email = input?.email;
      const password = input?.password;
      if (!email || !password) {
        return Promise.reject(createGraphQLError('Invalid input'));
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return Promise.reject(createGraphQLError('User cannot be found'));
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return Promise.reject(createGraphQLError('Password is incorrect'));
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, AppConfig.jwtSecret, { expiresIn: '1h' });

      return {
        user: user,
        token,
      };
    }
  }
};

export default resolvers;
