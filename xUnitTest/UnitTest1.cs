using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;
using Xunit;
using xUnitTest.API.Interfaces;
using xUnitTest.API.services;

namespace xUnitTest
{
  public class AppUser : IAppUser
  {
    public int Id { get; set; }
    public string UserName { get; set; }
    public string City {get; set;}
  }

  public class UnitTest1
    {

        [Theory]
        [InlineData(5,2)]
        [InlineData(6,1)]     
        [InlineData(3,4)]           
        [InlineData(8,-1)]   
        public void PassingAddMultipleValues(int x, int y)
        {
            var s = Program.Add(5, 2);
            Assert.Equal(7, s);
        }

        [Fact]
        public void FailingAdd()
        {
            var r = Program.Add(5,-5);
            Assert.NotEqual(r, 10);
        }
    }
}

