using Moq;
using Backend.Data;

namespace Backend.UnitTests
{
    class MockDbRepository<T> : IRepository<T> where T : class
    {

    }
    public class RespositoryTest
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}